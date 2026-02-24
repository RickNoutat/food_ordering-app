import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {Fragment} from "react";
import cn from 'clsx';

import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import {images, offers} from "@/constants";
import useAuthStore from "@/store/auth.store";
import useAppwrite from "@/lib/useAppwrite";
import {getPopularMenu} from "@/lib/appwrite";
import {MenuItem} from "@/type";

export default function Index() {
  const { user } = useAuthStore();
  const { data: popularItems, loading } = useAppwrite({ fn: getPopularMenu, params: { category: '', query: '' } });

  return (
      <SafeAreaView className="flex-1 bg-white">
          <FlatList
              data={offers}
              keyExtractor={item => String(item.id)}
              renderItem={({ item, index }) => {
                  const isEven = index % 2 === 0;

                  return (
                      <View>
                          <Pressable
                              className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                              style={{ backgroundColor: item.color }}
                              android_ripple={{ color: "#fffff22"}}
                          >
                              {({ pressed }) => (
                                  <Fragment>
                                      <View className={"h-full w-1/2"}>
                                        <Image source={item.image} className={"size-full"} resizeMode={"contain"} />
                                      </View>

                                      <View className={cn("offer-card__info", isEven ? 'pl-10': 'pr-10')}>
                                          <Text className="h1-bold text-white leading-tight">
                                              {item.title}
                                          </Text>
                                          <Image
                                            source={images.arrowRight}
                                            className="size-10"
                                            resizeMode="contain"
                                            tintColor="#ffffff"
                                          />
                                      </View>
                                  </Fragment>
                              )}
                          </Pressable>
                      </View>
                  )
              }}
              contentContainerClassName="pb-28 px-5"
              ListHeaderComponent={() => (
                  <View className="w-full my-5">
                      <View className="flex-between flex-row w-full mb-4">
                          <View className="flex-start">
                              <Text className="small-bold text-primary">DELIVER TO</Text>
                              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                                  <Text className="paragraph-bold text-dark-100">Croatia</Text>
                                  <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
                              </TouchableOpacity>
                          </View>

                          <CartButton />
                      </View>

                      <Text className="h3-bold text-dark-100 mb-1">
                          Hey, {user?.name?.split(' ')[0] ?? 'there'} 👋
                      </Text>
                      <Text className="paragraph-medium text-gray-200">
                          What would you like to eat today?
                      </Text>
                  </View>
              )}
              ListFooterComponent={() => (
                  <View className="mt-6">
                      <Text className="h3-bold text-dark-100 mb-10">Popular Items</Text>
                      {loading ? (
                          <ActivityIndicator color="#FE8C00" size="large" className="mt-5" />
                      ) : (
                          <FlatList
                              data={(popularItems as MenuItem[] | null) ?? []}
                              keyExtractor={item => item.$id}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              contentContainerStyle={{ paddingTop: 44, gap: 16, paddingBottom: 8 }}
                              renderItem={({ item }) => (
                                  <View style={{ width: 155 }}>
                                      <MenuCard item={item as MenuItem} />
                                  </View>
                              )}
                          />
                      )}
                  </View>
              )}
          />
      </SafeAreaView>
  );
}
