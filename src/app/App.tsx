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
							<AppBarMenu />
						</AppRouter>
					</SynchroWrapper>
				</Provider>
			</NextUIProvider>
		</div>
	)
}

export default App
