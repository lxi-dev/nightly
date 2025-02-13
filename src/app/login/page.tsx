import Logo from 'nglty/components/elements/logo/logo';
import LoginForm from './_components/login-form';
import UnicornStudioComponent from 'nglty/components/backgrounds/unicorn-studio';

export default function LoginPage() {
  return (
    <main>
    <div className="relative w-screen h-screen overflow-hidden m-0">
    <div className="w-full h-full flex items-center justify-center">
        {/* Radial mask overlay */}
        {/* <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 pointer-events-none [mask-image:radial-gradient(transparent, white)]" /> */}
        {/* Content */}
        <div className="flex flex-col gap-4 items-center justify-center">
            <div>
            <h1 className="md:text-4xl text-xl text-white relative z-20">
                <Logo />
            </h1>
            </div>
            <div className="w-full z-30">
                <LoginForm />
            </div>
        </div>
        <UnicornStudioComponent />
    </div>
    </div>   
</main>
  );
}