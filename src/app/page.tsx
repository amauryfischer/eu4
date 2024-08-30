import type { RootState } from "@/redux/store";
import AppBarMenu from "@/ui/organisms/Bars/AppBarMenu";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
	return (
		<div>
			page principal
			<Link href="/universe">universe</Link>
		</div>
	);
}
