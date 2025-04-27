import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { IMAGES_URL } from "@/constants/Urls";
import { IJwtPayload } from "@/interfaces/account";

const ProfileScreen = () => {

    const [payload, setPayload] = useState<IJwtPayload | null>(null);

    useEffect(() => {
        fetchToken();
    }, []);

    const fetchToken = async () => {
        const token = await SecureStore.getItemAsync("JWT") ?? "";
        const decoded = jwtDecode<IJwtPayload>(token);
        setPayload(decoded);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            className="w-full flex justify-center items-start my-6"
                            style={{
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            <Image
                                source={{ uri: `${IMAGES_URL}/400_${payload?.image}` }}
                                style={{ width: 300, height: 300 }}
                            />

                            <Text className="text-3xl font-bold my-6 text-black">
                                {payload?.name}
                            </Text>

                            <Text className="text-2xl font-bold mb-6 text-black">
                                Пошта: {payload?.email}
                            </Text>

                            <Text className="text-2xl font-bold mb-6 text-black">
                                Телефон: {payload?.phone}
                            </Text>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ProfileScreen;