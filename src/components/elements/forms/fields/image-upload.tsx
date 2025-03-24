'use client'

import { useState, useRef, useCallback } from 'react'
import { useFormStatus } from 'react-dom'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from 'nglty/components/ui/button'

export interface ImageUploadProps {
  id?: string
  label?: string
  description?: string
  value?: string
  onChange?: (url: string | null) => void
  disabled?: boolean
  maxSizeMB?: number
  className?: string
}

type VercelBlobResponse = {
  url: string; // The URL to access the blob
  name: string; // The name of the blob/file
  size: number; // The size of the blob in bytes
  type: string; // The MIME type of the blob
  success: boolean;
};

export function ImageUpload({
  id = 'image',
  label = 'Image',
  description = 'Drag and drop an image, or click to browse',
  value,
  onChange,
  disabled = false,
  maxSizeMB = 1,
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(value ?? null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { pending } = useFormStatus()
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled && !pending) {
      setIsDragging(true)
    }
  }, [disabled, pending])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (disabled || pending) return
    
    const file = e.dataTransfer.files[0]
    if(!file) return;
    void handleFile(file)
  }, [disabled, pending])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      void handleFile(file);
    }
  }, [])

  const handleFile = async (file: File) => {
    // Reset error state
    setError(null)
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    
    // Validate file size
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }
    
    // Create a preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    
    // Upload the file
    try {
      setIsUploading(true)
      
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const result: VercelBlobResponse = await response.json() as VercelBlobResponse
      
      if (!result.success) {
        throw new Error('Upload failed')
      }
      
      // Call onChange with the new URL
      if (onChange) {
        onChange(result.url)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      // Revert preview on error
      setPreview(value ?? null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    
    setPreview(null)
    if (onChange) {
      onChange(null)
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onChange])

  const handleButtonClick = useCallback(() => {
    if (!disabled && !pending && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [disabled, pending])

  return (
    <div className={clsx("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="text-gray-700">
          {label}
        </label>
      )}
      
      <div
        className={clsx(
          "border-2 border-dashed rounded-lg transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300",
          (disabled || pending) && "opacity-60 cursor-not-allowed",
          "relative"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled || pending || isUploading}
          className="sr-only"
        />
        
        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover"
            />
            {!disabled && !pending && !isUploading && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">{description}</p>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                disabled={disabled || pending || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload Image'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
