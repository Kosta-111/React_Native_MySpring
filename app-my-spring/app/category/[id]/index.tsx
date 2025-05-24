import { useLocalSearchParams, useRouter } from 'expo-router';
import {useDeleteCategoryMutation, useGetCategoryQuery} from '@/services/categoriesService';
import {View, Text, Image, TouchableOpacity, Alert, FlatList, StyleSheet, ScrollView} from 'react-native';
import {IMAGES_URL} from "@/constants/Urls";
import React from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {useGetDishesQuery} from "@/services/dishesService";
import DishCard from "@/components/dish/dishCard";

export default function ViewCategoryScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: category } = useGetCategoryQuery(Number(id));
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const {data: dishes, isLoading: isLoadingDishes} = useGetDishesQuery(Number(id));

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
        <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ padding: 16 }}>
                <LoadingOverlay visible={ isDeleting } />

                <Image source={{ uri: `${IMAGES_URL}/400_${category.image}` }} className="w-10/12 h-48 rounded-lg mb-2" resizeMode="contain" />
                <Text className="text-black text-4xl font-medium">{category.name}</Text>
                <Text className="text-black text-xl font-normal">Опис: {category.description}</Text>

                {/* Кнопка "Редагувати категорію" */}
                <TouchableOpacity
                    onPress={() => router.push(`/category/${id}/edit`)}
                    className="w-full bg-yellow-500 p-4 rounded-lg mt-4"
                >
                    <Text className="text-white text-center text-lg font-medium">
                        Редагувати категорію
                    </Text>
                </TouchableOpacity>

                {/* Кнопка "Видалити категорію" */}
                <TouchableOpacity
                    onPress={() => confirmDelete(category.id)}
                    className="w-full bg-red-500 p-4 rounded-lg mt-2"
                >
                    <Text className="text-white text-center text-lg font-medium">
                        Видалити категорію
                    </Text>
                </TouchableOpacity>

                {/* Страви */}
                <Text style={styles.title}>Страви категорії</Text>
                <LoadingOverlay visible={isLoadingDishes} />

                {/* Кнопка "Додати страву" */}
                <TouchableOpacity
                    onPress={() => router.push(`/dish/${id}/create`)}
                    className="w-1/2 bg-green-600 p-4 rounded-lg m-4"
                >
                    <Text className="text-white text-center text-lg font-medium">
                        Додати страву
                    </Text>
                </TouchableOpacity>

                {/* Список страв */}
                {dishes && (
                    <FlatList
                        data={dishes}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ gap: 5, paddingBottom: 10 }}
                        scrollEnabled={false}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View className="w-full pb-5">
                                <DishCard dish={item} />
                            </View>
                        )}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {fontSize: 26, marginBottom: 15, marginTop: 50, textAlign: "center", fontWeight: "bold"},
});