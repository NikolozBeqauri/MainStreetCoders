'use client'
import { ReactNode } from "react"
import { RecoilRoot, useRecoilState } from "recoil"
import { activeSidebarState } from "@/app/states"


export const RecoilWrapper = (props: { children: ReactNode }) => {

    return (
        <RecoilRoot>
            {props.children}
        </RecoilRoot>
    )
}