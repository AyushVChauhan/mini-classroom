import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const myColor: MantineColorsTuple = [
    '#ecefff',
    '#d5dafb',
    '#a9b1f1',
    '#7a87e9',
    '#5362e1',
    '#3a4bdd',
    '#2c40dc',
    '#1f32c4',
    '#182cb0',
    '#0a259c',
];
const theme = createTheme({
    fontFamily: 'Lato, sans serif',
    colors: {
        myColor,
    },
});
const queryClient = new QueryClient();
function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme} defaultColorScheme="dark">
                <Notifications w="auto" />
                {children}
            </MantineProvider>
        </QueryClientProvider>
    );
}

export default AppProvider;
