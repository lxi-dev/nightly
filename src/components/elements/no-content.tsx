import { Frown } from "lucide-react"

export const NoContentAvailable = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md">
        <Frown className="w-12 h-12 text-gray-500 dark:text-gray-400" />
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-base">No content available</p>
      </div>
    )
}