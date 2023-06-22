import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DownArrowIcon from '../icons/DownArrowIcon'
import { signIn } from 'next-auth/react'


type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className={styles.container}>
            <Menu>
                <MenuButton className={styles.signInButton}>
                    <span className={styles.signInSpan}>
                        <div>Sign In</div>
                        <DownArrowIcon w={20} h={20} />
                    </span>
                </MenuButton>
                <MenuList className={styles.menuList}>
                    <MenuItem onClick={() => signIn('google')}>Google</MenuItem>
                    <MenuItem onClick={() => { signIn('facebook') }}>Facebook</MenuItem>
                    <MenuItem onClick={() => signIn('twitter')}>Twitter</MenuItem>

                </MenuList>
            </Menu>
        </div>
    )
}

const styles = {
    container: 'w-full h-14 bg-gray-800 flex justify-end items-center p-4',
    signInButton: 'h-4 w-fit p-4 bg-gray-300 rounded-full hover:bg-gray-400 gap-2',
    signInSpan: 'flex items-center gap-2',
    menuList: 'text-left'
}