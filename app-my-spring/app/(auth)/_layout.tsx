import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="register"
                options={{
                    title: 'Реєстрація',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="person-add.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Вхід',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="login.fill" color={color}/>,
                }}
            />

            <Tabs.Screen
                name="index"
                options={{ href: null }} // Прибираємо "index" з вкладок
            />
        </Tabs>
    );
}
