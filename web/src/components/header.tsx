import { ActionIcon, Button, Title, useMantineColorScheme } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { MdMenu, MdDarkMode, MdOutlineLightMode, MdPerson } from 'react-icons/md';
import { User } from '../types/api';
type HeaderProps = {
    onHamburgerClick?: () => void;
    showProfile?: boolean;
};

function Header({ onHamburgerClick, showProfile }: HeaderProps) {
    const queryClient = useQueryClient();
    const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const user = useMemo(() => {
        if (showProfile) {
            return queryClient.getQueryData(['user']) as User | null;
        }
        return null;
    }, [queryClient, showProfile]);
    console.log(user);
    return (
        <div className="flex items-center h-16 px-3 border-b">
            <div className="block md:hidden">
                {onHamburgerClick && (
                    <ActionIcon
                        className="me-3"
                        variant="subtle"
                        color="gray"
                        size="lg"
                        onClick={onHamburgerClick}
                    >
                        <MdMenu size={20} />
                    </ActionIcon>
                )}
            </div>
            <div>
                <Title order={4}>Mini Classroom</Title>
            </div>
            <div className="ms-auto flex items-center">
                {showProfile && (
                    <Button rightSection={<MdPerson size={20} />} variant="subtle">
                        Hello
                    </Button>
                )}
                <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => setColorScheme(colorScheme == 'dark' ? 'light' : 'dark')}
                >
                    {colorScheme == 'light' ? (
                        <MdDarkMode size={20} />
                    ) : (
                        <MdOutlineLightMode size={20} />
                    )}
                </ActionIcon>
            </div>
        </div>
    );
}

export default Header;
