"use client"

import lottie from "lottie-web"
import { defineElement } from "lord-icon-element"
import React from "react"
import { Player } from "@lottiefiles/react-lottie-player"
// define "lord-icon" custom element with default properties
// @ts-ignore
defineElement(lottie.loadAnimation)
import styled from "styled-components"
import colored from "@/utils/colored"

const LordIconContainer = colored(styled.div<{
	strokeWidth?: string
	shouldRotate?: boolean
}>`
    display: flex;
    align-items: center;
    justify-content: center;
	transition: transform 0.3s ease-in-out;
	transform: ${({ shouldRotate }) =>
		shouldRotate ? "rotate(180deg)" : "rotate(0deg)"};
    * {
        color: var(--color) !important;
        fill: var(--color) !important;
		${({ strokeWidth }) => {
			if (strokeWidth) {
				return `stroke-width: ${strokeWidth} !important;`
			}
			return `stroke-width: 0.6rem !important;`
		}}
    }
`)

const LordIcon = React.memo(
	({
		name,
		isHovering,
		width = "20px",
		color,
		strokeWidth,
		shouldRotate,
		rotate,
		noLoop = false,
	}: {
		name: string
		isHovering?: boolean
		width?: string
		color?: string
		strokeWidth?: string
		shouldRotate?: boolean
		rotate?: boolean
		noLoop?: boolean
	}) => {
		if (isHovering === undefined) {
			return (
				<LordIconContainer
					color={color ?? "primary"}
					strokeWidth={strokeWidth}
					shouldRotate={shouldRotate}
				>
					<Player
						autoplay
						loop={!noLoop}
						src={`/animation/${name}.json`}
						style={{
							width,
							height: width,
							color: color ?? "primary",
						}}
					/>
				</LordIconContainer>
			)
		}
		return (
			<LordIconContainer
				color={color ?? "primary"}
				strokeWidth={strokeWidth}
				shouldRotate={shouldRotate}
			>
				<Player
					autoplay
					loop={!noLoop}
					src={`/animation/${name}.json`}
					className="tag-icon"
					style={{
						width,
						height: width,
						display: isHovering ? "block" : "none",
						color: color ?? "primary",
					}}
				/>
				<Player
					src={`/animation/${name}.json`}
					className="tag-icon"
					style={{
						width,
						height: width,
						display: isHovering ? "none" : "block",
						color: color ?? "primary",
					}}
				/>
			</LordIconContainer>
		)
	},
)
export default LordIcon
