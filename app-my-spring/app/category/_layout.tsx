import {Stack} from "expo-router";
import React from "react";

export default function CategoryLayout() {

    return (
        <Stack>
            <Stack.Screen
                name="create"
                options={{
                    headerShown: true,
                    title: 'Створити категорію'
                }}
            />
            <Stack.Screen
                name="[id]/edit"
                options={{
                    headerShown: true,
                    title: 'Редагувати категорію'
                }}
            />
            <Stack.Screen
                name="[id]/index"
                options={{
                    headerShown: true,
                    title: 'Деталі категорії'
                }}
            />
        </Stack>
    );
}