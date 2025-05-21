import SkeletonAvatar from "@/components/ui/skeleton/skeleton-avatar";
import SkeletonText from "@/components/ui/skeleton/skeleton-text";
import React from "react";

function RecSkeleton() {
  return (
    <section className="flex flex-col gap-10 p-[var(--content-spacing)] @container">
      {new Array(4).fill(0).map((_, index) => (
        <div key={index}>
          <SkeletonText size={"md"} className="mb-4 w-[25%]" />
          <div className="flex gap-4">
            <SkeletonAvatar size={"lg"} />
            <SkeletonAvatar size={"lg"} />
            <SkeletonAvatar size={"lg"} />
            <SkeletonAvatar size={"lg"} />
            <SkeletonAvatar size={"lg"} />
            <SkeletonAvatar size={"lg"} />
          </div>
        </div>
      ))}
    </section>
  );
}

export default RecSkeleton;
