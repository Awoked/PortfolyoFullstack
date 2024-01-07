import DrawingsGrid from "../_components/Drawings/DrawingsGrid";
import Breadcrumb from "@/components/ui/breadcrumb";
import SectionTitle from "@/components/ui/section-title";
import api from "@/services/api";
import Image from "next/image";
import React, { Suspense } from "react";
import Loading from "./loading";
import Drawings from "./Drawings";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: number;
  };
}) => {
  const { data: _drawingsSectionData } = await api.sections.findBySection(
    "drawings"
  );
  const drawingsSectionData = _drawingsSectionData[0];

  const page = searchParams?.page;

  return (
    <main className="pt-28 min-h-screen">
      <Breadcrumb />
      <section>
        <SectionTitle>
          <h1>{drawingsSectionData.attributes.title}</h1>
        </SectionTitle>

        <Suspense fallback={<Loading />}>
          <Drawings page={page} />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
