"use client"
import { SectionData } from "@prisma/client";
import SectionTitle from "../ui/SectionTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RootUrls } from "@/utils/consts";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Sections } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

type PropsType = {
    data: SectionData[]
};
export function DataTable({ data }: PropsType) {
    
    const { toast } = useToast();
    const handleDelete = async (id: number) => {
        try {
            const data: { section: SectionData } = await Sections.DELETE({ id, client: true })
            toast({
                title: "Deleted",
                description: data.section.section
            })
        } catch (error) {
            toast({
                title: "Deleted"
            })
        }
    }

    return (
        <>
            <SectionTitle className="mb-4">
                <h1>
                    Sections
                </h1>
            </SectionTitle>
            <div className="flex flex-col gap-y-4">
                {
                    data?.map((data, index) => (
                        <div className="flex justify-between items-center p-4 border border-primary rounded-md" key={index}>
                            <p className="font-bold text-xl">
                                {data.section}
                            </p>

                            <div className="flex items-center gap-1.5">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your section data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => { handleDelete(data.id) }}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Button asChild>
                                    <Link href={`${RootUrls.Dashboard.SubPages.Sections.url}/${data.section}`}>
                                        Edit
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                }
                <Button asChild className="flex w-full justify-center items-center p-4 border border-primary rounded-md">
                    <Link href={`${RootUrls.Dashboard.SubPages.Sections.url}/create`}>
                        Create
                    </Link>
                </Button>
            </div>
        </>
    )
}
