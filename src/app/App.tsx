"use-client"
import store from "@/redux/store/store"
import GlobalStyle from "@/ui/fondations/GlobalStyle"
import AppBarMenu from "@/ui/organisms/Bars/AppBarMenu"
import LeftSideBar from "@/ui/organisms/Bars/LeftSideBar"
import RightSideBar from "@/ui/organisms/Bars/RightSideBar"
import { NextUIProvider } from "@nextui-org/react"
import { defineElement } from "lord-icon-element"
import lottie from "lottie-web"
import React, { useState } from "react"
import { Provider } from "react-redux"

import AppRouter from "./page/AppRouter"
import SynchroWrapper from "./SynchroWrapper"
import BottomTaskBar from "@/ui/organisms/Bars/BottomTaskBar"

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
							<BottomTaskBar />
						</AppRouter>
					</SynchroWrapper>
				</Provider>
			</NextUIProvider>
		</div>
	)
}

export default App
