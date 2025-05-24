import {Stack} from "expo-router";
import React from "react";

export default function DishLayout() {

    return (
        <Stack>
            <Stack.Screen
                name="[id]/create"
                options={{
                    headerShown: true,
                    title: 'Створити страву'
                }}
            />
            <Stack.Screen
                name="[id]/edit"
                options={{
                    headerShown: true,
                    title: 'Редагувати страву'
                }}
            />
        </Stack>
    );
}