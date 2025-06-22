//Link from Radix does not do client side navigation but we need consistent styling so ...
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";


interface Props {
    href: string;
    children: string
}

function Link({ children, href }: Props) {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink>
                {children}
            </RadixLink>
        </NextLink>
    )
}

export default Link
