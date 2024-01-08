"use client"

import React, { useState } from "react"
import { Provider } from "react-redux"
import AppRouter from "./page/AppRouter"
import SynchroWrapper from "./SynchroWrapper"
import AppBarMenu from "@/ui/organisms/AppBarMenu"
import lottie from "lottie-web"
import { defineElement } from "lord-icon-element"
import store from "@/redux/store/store"
import GlobalStyle from "@/ui/fondations/GlobalStyle"
import { NextUIProvider } from "@nextui-org/react"
import RightSideBar from "@/ui/organisms/RightSideBar"
import LeftSideBar from "@/ui/organisms/LeftSideBar"

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)

const App = () => {
	return (
		<div suppressHydrationWarning>
			<NextUIProvider>
				<Provider store={store}>
					<SynchroWrapper>
						<GlobalStyle />
						<AppRouter>
							<LeftSideBar />
							<RightSideBar />
							<AppBarMenu />
						</AppRouter>
					</SynchroWrapper>
				</Provider>
			</NextUIProvider>
		</div>
	)
}

export default App
