import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "@/services/accountService";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Alert } from 'react-native';

const SignUpScreen = () => {
    const router = useRouter(); // Ініціалізуємо роутер
    const [form, setForm] = useState({ email: "", password: "", phoneNumber: "", firstname: "", lastname: "" });
    const [register, { isLoading, error } ] = useRegisterMutation();

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSignUp = async () => {
        console.log("Реєстрація:", form);
        try {
            await register(form).unwrap();
            console.log("registered successfully");
            Alert.alert('Успіх', 'Реєстрація успішна!\nБудь ласка, увійдіть в акаунт)');
            router.replace("/login");
        }
        catch (err) {
            console.log("Register is problem:", err);
        }
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
                        <LoadingOverlay visible={isLoading} />

                        <View
                            className="w-full flex justify-center items-center my-6"
                            style={{
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            <Text className="text-3xl font-bold mb-6 text-black">
                                Реєстрація
                            </Text>

                            <FormField
                                title={"Ім'я"}
                                value={form.firstname}
                                handleChangeText={(value: string) => handleChange("firstname", value)}
                                placeholder={"Вкажіть ім'я"}
                            />

                            <FormField
                                title={"Прізвище"}
                                value={form.lastname}
                                handleChangeText={(value: string) => handleChange("lastname", value)}
                                placeholder={"Вкажіть прізвище"}
                            />

                            <FormField
                                title={"Телефон"}
                                value={form.phoneNumber}
                                handleChangeText={(value: string) => handleChange("phoneNumber", value)}
                                placeholder={"Вкажіть телефон"}
                            />

                            <FormField
                                title={"Пошта"}
                                value={form.email}
                                handleChangeText={(value: string) => handleChange("email", value)}
                                placeholder={"Вкажіть пошту"}
                                keyboardType="email-address"
                            />

                            <FormField
                                title={"Пароль"}
                                value={form.password}
                                handleChangeText={(value: string) => handleChange("password", value)}
                                placeholder={"Вкажіть пароль"}
                                secureTextEntry={true}
                            />

                            {/* Кнопка "Реєстрація" */}
                            <TouchableOpacity
                                onPress={handleSignUp}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Зареєструватися
                                </Text>
                            </TouchableOpacity>

                            {/* Кнопка "Вхід" */}
                            <TouchableOpacity
                                onPress={() => router.replace("/login")}
                                className="w-full bg-gray-300 p-4 rounded-lg mt-2"
                            >
                                <Text className="text-black text-center text-lg font-medium">
                                    Є акаунт? Увійти
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default SignUpScreen;
