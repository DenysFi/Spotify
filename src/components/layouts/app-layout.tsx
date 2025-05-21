import { type ReactNode } from "react";
import Head from "../seo/head";
import Box from "../ui/box/box";

import MediaLibrary from "@/features/media-library/components/main";
import { Resizer } from "../ui/resizer";
import Sidebar from "../ui/sidebar/sidebar";

import { useToken } from "./api/useToken";
import Loader from "../ui/loader/loader";
import { Scrollbar } from "../ui/scrollbar";
import LayoutHeader from "@/features/layout-header/components/layout-header";
import { useLocation } from "react-router-dom";

function AppLayout({ children }: { children: ReactNode }) {
  const tokenQuery = useToken();
  const { pathname } = useLocation();
  return (
    <Loader isLoading={tokenQuery.isLoading}>
      <Head title="MusicLib Music Player" />
      <main className="relative grid h-screen w-screen grid-cols-[auto_minmax(26rem,_1fr)_auto] grid-rows-[3rem,_1fr] gap-[var(--panel-gap)] overflow-hidden bg-black p-2 text-white [grid-template-areas:'header_header_header''left-sidebar_main_right-sidebar''player_player_player']">
        <LayoutHeader />
        <Sidebar className="grid [grid-area:left-sidebar]">
          <Resizer
            className="flex flex-col gap-2"
            position="right"
            min={288}
            max={384}
            saveLastWidth
          >
            <MediaLibrary />
          </Resizer>
        </Sidebar>
        <Box
          className="relative min-w-96 [grid-area:main] max-[1150px]:col-span-2"
          aria-label="Основной контент"
        >
          <Scrollbar key={pathname}>
            <main className="h-full w-full">{children}</main>
          </Scrollbar>
        </Box>
      </main>
    </Loader>
  );
}

export default AppLayout;
