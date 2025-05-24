import React from 'react'
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native'
import { IMAGES_URL } from '@/constants/Urls'
import {IDishItem} from "@/interfaces/dish";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {useRouter} from "expo-router";
import {useDeleteDishMutation} from "@/services/dishesService";

interface DishCardProps {
    dish: IDishItem
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
    const router = useRouter();
    const [deleteDish] = useDeleteDishMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteDish(id).unwrap();
            console.log(`dish [${id}] deleted successfully`);
        } catch (err) {
            console.error('Error deleting dish:', err);
        }
    };

    const confirmDelete = (id: number) => {
        Alert.alert(
            'Підтвердження',
            'Ви дійсно хочете видалити цю страву?',
            [
                { text: 'Скасувати', style: 'cancel' },
                { text: 'Видалити', style: 'destructive', onPress: () => handleDelete(id) }
            ]
        );
    };

    return (
        <View className={`flex-row bg-white rounded-md p-2 justify-between shadow-sm shadow-white relative gap-x-5`}>

            <View className={`flex-row p-1 items-start relative`}>
                <Image source={{ uri: `${IMAGES_URL}/200_${dish.images[0]}` }} className="w-24 h-24 rounded-md mb-2" />

                <View className={`flex-col p-2 items-center relative`}>
                    <Text className="text-2xl font-semibold mb-1">{dish.name}</Text>
                    <Text className="text-lg font-semibold mb-1">{dish.price} грн.</Text>
                </View>
            </View>

            <View className={`flex-col p-1 justify-between relative`}>
                <TouchableOpacity
                    onPress={() => confirmDelete(dish.id)}
                >
                    <IconSymbol
                        // @ts-ignore
                        name="delete.fill"
                        size={28}
                        color={"red"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.replace(`/dish/${dish.id}/edit`)}
                >
                    <IconSymbol
                        // @ts-ignore
                        name="edit.fill"
                        size={28}
                        color={"orange"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DishCard