import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="h-screen w-full grid place-items-center bg-black text-white">
            <div className="text-center space-y-2">
                <h1 className="text-2xl">Aradığınız sayfa bulunamadı</h1>
                <Button asChild variant={"link"}>
                    <Link href={"/"}>Ana sayfaya geri dön</Link>
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
