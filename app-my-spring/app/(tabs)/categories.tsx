import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {useGetCategoriesQuery} from "@/services/categoriesService";
import LoadingOverlay from "@/components/LoadingOverlay";
import CategoryCard from "@/components/category/CategoryCard";
import React from "react";

const CategoriesScreen = () => {
    const router = useRouter();
    const {data: categories, isLoading, error} = useGetCategoriesQuery();

    console.log("data", categories);
    console.log("error", error);

    return (
        <View>
            <Text style={styles.title}>Категорії</Text>
            <LoadingOverlay visible={isLoading} />

            {/* Кнопка "Створити" */}
            <TouchableOpacity
                onPress={() => router.push("/category/create")}
                className="w-5/12 bg-green-600 p-4 rounded-lg m-4"
            >
                <Text className="text-white text-center text-lg font-medium">
                    Додати категорію
                </Text>
            </TouchableOpacity>

            {categories && (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10, paddingBottom: 200 }}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View className="w-[49%] pb-5">
                            <CategoryCard
                                category={item}
                                onPress={() => router.push(`/category/${item.id}`)}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {fontSize: 20, marginBottom: 15, marginTop: 50, textAlign: "center", fontWeight: "bold"},
});

export default CategoriesScreen;