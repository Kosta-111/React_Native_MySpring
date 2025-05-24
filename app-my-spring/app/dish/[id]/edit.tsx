import {useEffect, useState} from 'react';
import {
    View,Text, Image,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Dimensions, TouchableOpacity
} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {getFileFromUriAsync} from "@/utils/getFileFromUriAsync";
import * as ImagePicker from 'expo-image-picker';
import {SafeAreaProvider} from "react-native-safe-area-context";
import LoadingOverlay from "@/components/LoadingOverlay";
import FormField from "@/components/FormField";
import {Ionicons} from "@expo/vector-icons";
import {IMAGES_URL} from "@/constants/Urls";
import {useGetDishQuery, useUpdateDishMutation} from "@/services/dishesService";

export default function EditDishScreen() {
    const router = useRouter(); // Ініціалізуємо роутер
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: dish } = useGetDishQuery(Number(id));
    const [form, setForm] = useState({ id: 0, name: "", description: "", price: "" });
    const [images, setImages] = useState<string[]>([]);
    const [updateDish, { isLoading }] = useUpdateDishMutation();

    useEffect(() => {
        if (dish) { // Коли страва завантажена, оновлюємо стейт
            setForm({
                id: dish.id,
                name: dish.name,
                description: dish.description,
                price: dish.price.toString()
            });
            setImages(dish.images.map(image => `${IMAGES_URL}/400_${image}`));
        }
    }, [dish]);

    const handleChange = (field: string, value: string | number) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        console.log("Редагування страви:", form);
        try {
            const files = await Promise.all(images.map(uri => getFileFromUriAsync(uri)));
            await updateDish({
                ...form,
                // @ts-ignore
                images: files
            }).unwrap();
            console.log("dish updated successfully");
            router.replace(`/category/${dish?.categoryId}`);
        }
        catch (err) {
            console.log("Dish updating is problem:", err);
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
            allowsMultipleSelection: true
        });
        if (!result.canceled) {
            //result.assets - масив обраних файлів
            const uris = result.assets.map(asset => asset.uri);
            setImages(prev => [...prev, ...uris]);
        }
    }

    // видалення картинки за індексом
    const removeImage = (indexToRemove: number) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
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
                                Редагування страви
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

                            <FormField
                                title={"Ціна"}
                                value={form.price}
                                handleChangeText={(value: string) => handleChange("price", Number(value))}
                                placeholder={"Вкажіть ціну"}
                            />

                            <View className={"space-y-2 w-full"}>
                                <TouchableOpacity onPress={pickImage} className={"mt-4 p-4 bg-blue-400 rounded-xl"}>
                                    <View className="flex flex-row items-center justify-center gap-2">
                                        <Text className="text-center text-white font-psemibold">Pick an Image</Text>
                                        <Ionicons name="image" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>
                                <View className="flex-row flex-wrap justify-center items-center gap-2 mt-4">
                                    {images.map((uri, index) => (
                                        <View key={index} style={{ position: 'relative', margin: 5 }}>
                                            <Image
                                                source={{ uri }}
                                                style={{ width: 80, height: 80, borderRadius: 10 }}
                                            />
                                            <TouchableOpacity
                                                onPress={() => removeImage(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: -10,
                                                    right: -10,
                                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                                    borderRadius: 12,
                                                    width: 24,
                                                    height: 24,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Ionicons name="close" size={16} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Кнопка "Зберегти" */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Зберегти
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}