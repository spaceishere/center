"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { Separator } from "@/components/ui/separator";
import branches from "@/gql/branch/queries";
import { TBranch } from "@/types";
import { useAtom } from "jotai";
import { branchInfoAtom } from "@/features/order/store/order";
import { cn } from "@/lib/utils";

export default function BranchInfo() {
  const { data, loading, error } = useQuery(branches, {
    variables: {
      withoutUserFilter: true,
    },
  });
  const [branchInfo, setBranchInfo] = useAtom(branchInfoAtom);

  const onSelect = (id: string) => {
    const selectedBranch = data?.branches.find(
      (branch: TBranch) => branch._id === id,
    );

    if (selectedBranch) {
      setBranchInfo({ id: selectedBranch._id, title: selectedBranch.title });
    }
  };

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="py-8 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="space-y-3">
      <h2 className="col-span-6 text-lg font-bold">Салбар сонгох</h2>

      <Separator />

      {data?.branches.map((branch: TBranch) => (
        <div
          key={branch._id}
          className={cn(
            "cursor-pointer rounded-lg border px-5 py-3",
            branch._id === branchInfo?.id &&
              "border-primary bg-primary text-white",
            branch._id !== branchInfo?.id &&
              "transition-colors duration-200 hover:bg-primary/20",
          )}
          onClick={() => onSelect(branch._id)}
        >
          <h3 className="text-sm font-medium">{branch.title}</h3>
          {/* <AccordionContent className="px-4 pb-4 pt-0">
            <div className="mt-2 flex items-start text-gray-600">
              <MapPin className="mr-2 h-5 w-5 text-gray-400" />
              <p>{branch.address?.replace(/\|/g, "")}</p>
            </div>
          </AccordionContent> */}
        </div>
      ))}
    </div>
  );
}
