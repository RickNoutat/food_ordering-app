import {View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams, router} from "expo-router";
import useAppwrite from "@/lib/useAppwrite";
import {getMenuById, appwriteConfig} from "@/lib/appwrite";
import {useCartStore} from "@/store/cart.store";
import {images} from "@/constants";
import {MenuItem} from "@/type";

export default function MenuDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, loading } = useAppwrite({ fn: getMenuById, params: { id } });
    const { addItem } = useCartStore();

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator color="#FE8C00" size="large" />
            </SafeAreaView>
        );
    }

    const item = data as MenuItem;
    if (!item) return null;

    const imageUrl = `${item.image_url}?project=${appwriteConfig.projectId}`;

    const handleAddToCart = () => {
        addItem({ id: item.$id, name: item.name, price: item.price, image_url: imageUrl, customizations: [] });
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerClassName="pb-36">

                {/* Header */}
                <View className="flex-between flex-row px-5 py-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="size-10 rounded-full bg-gray-100 flex-center"
                    >
                        <Image source={images.arrowBack} className="size-4" resizeMode="contain" />
                    </TouchableOpacity>
                    <Text className="base-semibold text-dark-100">Detail</Text>
                    <View className="size-10" />
                </View>

                {/* Hero image */}
                <View className="items-center bg-primary/5 mx-5 rounded-3xl py-10 mb-6">
                    <Image source={{ uri: imageUrl }} className="size-56" resizeMode="contain" />
                </View>

                <View className="px-5">

                    {/* Name & price */}
                    <View className="flex-between flex-row mb-2">
                        <Text className="h3-bold text-dark-100 flex-1 mr-4">{item.name}</Text>
                        <Text className="h3-bold text-primary">${item.price}</Text>
                    </View>

                    {/* Category badge */}
                    <View className="bg-primary/10 self-start px-3 py-1 rounded-full mb-5">
                        <Text className="small-bold text-primary uppercase">{item.type}</Text>
                    </View>

                    {/* Stats */}
                    <View className="flex-row gap-3 mb-6">
                        <View className="flex-1 bg-gray-50 rounded-2xl p-3 items-center gap-1">
                            <Image source={images.star} className="size-5" resizeMode="contain" tintColor="#FE8C00" />
                            <Text className="paragraph-bold text-dark-100">{item.rating}</Text>
                            <Text className="body-regular text-gray-200">Rating</Text>
                        </View>
                        <View className="flex-1 bg-gray-50 rounded-2xl p-3 items-center gap-1">
                            <Image source={images.clock} className="size-5" resizeMode="contain" tintColor="#FE8C00" />
                            <Text className="paragraph-bold text-dark-100">{item.calories}</Text>
                            <Text className="body-regular text-gray-200">Calories</Text>
                        </View>
                        <View className="flex-1 bg-gray-50 rounded-2xl p-3 items-center gap-1">
                            <Image source={images.dollar} className="size-5" resizeMode="contain" tintColor="#FE8C00" />
                            <Text className="paragraph-bold text-dark-100">{item.protein}g</Text>
                            <Text className="body-regular text-gray-200">Protein</Text>
                        </View>
                    </View>

                    {/* Description */}
                    {!!item.description && (
                        <View>
                            <Text className="base-bold text-dark-100 mb-2">Description</Text>
                            <Text className="paragraph-medium text-gray-200 leading-6">{item.description}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Sticky Add to Cart */}
            <View className="absolute bottom-0 left-0 right-0 bg-white px-5 pb-10 pt-4 border-t border-gray-100">
                <TouchableOpacity
                    onPress={handleAddToCart}
                    className="bg-primary rounded-full p-4 flex-row items-center justify-center gap-2"
                >
                    <Image source={images.bag} className="size-5" resizeMode="contain" tintColor="white" />
                    <Text className="paragraph-bold text-white">Add to Cart</Text>
                    <Text className="paragraph-bold text-white/60">·</Text>
                    <Text className="paragraph-bold text-white">${item.price}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
