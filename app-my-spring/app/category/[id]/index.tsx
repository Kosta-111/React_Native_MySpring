import { useLocalSearchParams, useRouter } from 'expo-router';
import {useDeleteCategoryMutation, useGetCategoryQuery} from '@/services/categoriesService';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {IMAGES_URL} from "@/constants/Urls";
import React from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function ViewCategoryScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: category } = useGetCategoryQuery(Number(id));
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id).unwrap();
            console.log(`category [${id}] deleted successfully`);
            router.back();
        } catch (err) {
            console.error('Error deleting category:', err);
        }
    };

    const confirmDelete = (id: number) => {
        Alert.alert(
            'Підтвердження',
            'Ви дійсно хочете видалити цю категорію?',
            [
                { text: 'Скасувати', style: 'cancel' },
                { text: 'Видалити', style: 'destructive', onPress: () => handleDelete(id) }
            ]
        );
    };

    if (!category) return <Text style={{ padding: 16 }}>Категорія не знайдена</Text>;

    return (
        <View style={{ padding: 16 }}>
            <LoadingOverlay visible={ isDeleting } />

            <Image source={{ uri: `${IMAGES_URL}/400_${category.image}` }} className="w-10/12 h-48 rounded-lg mb-2" resizeMode="contain" />
            <Text className="text-black text-4xl font-medium">{category.name}</Text>
            <Text className="text-black text-xl font-normal">Опис: {category.description}</Text>

            {/* Кнопка "Редагувати" */}
            <TouchableOpacity
                onPress={() => router.push(`/category/${id}/edit`)}
                className="w-full bg-yellow-500 p-4 rounded-lg mt-4"
            >
                <Text className="text-white text-center text-lg font-medium">
                    Редагувати
                </Text>
            </TouchableOpacity>

            {/* Кнопка "Видалити" */}
            <TouchableOpacity
                onPress={() => confirmDelete(category.id)}
                className="w-full bg-red-500 p-4 rounded-lg mt-2"
            >
                <Text className="text-white text-center text-lg font-medium">
                    Видалити
                </Text>
            </TouchableOpacity>
        </View>
    );
}