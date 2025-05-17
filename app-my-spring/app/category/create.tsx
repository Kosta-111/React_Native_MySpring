import { useState } from 'react';
import {
    View,Text, Image,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Dimensions, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import {useCreateCategoryMutation} from "@/services/categoriesService";
import {getFileFromUriAsync} from "@/utils/getFileFromUriAsync";
import * as ImagePicker from 'expo-image-picker';
import {SafeAreaProvider} from "react-native-safe-area-context";
import LoadingOverlay from "@/components/LoadingOverlay";
import FormField from "@/components/FormField";
import {Ionicons} from "@expo/vector-icons";

export default function CreateCategoryScreen() {
    const router = useRouter(); // Ініціалізуємо роутер
    const [form, setForm] = useState({ name: "", description: "" });
    const [image, setImage] = useState<string | null>(null);
    const [createCategory, { isLoading }] = useCreateCategoryMutation();

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        console.log("Створення категорії:", form);
        try {
            const file = image ? await getFileFromUriAsync(image) : null;
            await createCategory({
                ...form,
                //@ts-ignore
                image: file
            }).unwrap();
            console.log("category created successfully");
            router.back();
        }
        catch (err) {
            console.log("Category creation is problem:", err);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Для вибору фото дай доступ до файлів");
            return;
        }
        const result =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

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
                                Додати нову категорію
                            </Text>

                            <FormField
                                title={"Назва"}
                                value={form.name}
                                handleChangeText={(value: string) => handleChange("name", value)}
                                placeholder={"Вкажіть назву"}
                            />

                            <FormField
                                title={"Опис"}
                                value={form.description}
                                handleChangeText={(value: string) => handleChange("description", value)}
                                placeholder={"Додайте опис"}
                            />

                            <View className={"space-y-2 w-full"}>
                                <TouchableOpacity onPress={pickImage} className={"mt-4 p-4 bg-blue-400 rounded-xl"}>
                                    <View className="flex flex-row items-center justify-center gap-2">
                                        <Text className="text-center text-white font-psemibold">Pick an Image</Text>
                                        <Ionicons name="image" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>
                                {image && (
                                    <View className="w-full flex justify-center items-center">
                                        <Image source={{ uri: image }} className="w-40 h-40 rounded-full" />
                                    </View>
                                )}
                            </View>

                            {/* Кнопка "Створити" */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Створити категорію
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}