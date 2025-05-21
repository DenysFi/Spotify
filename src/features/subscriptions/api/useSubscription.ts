import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type ItemType = 'artist' | 'album' | 'playlist';

interface SubscriptionParams {
  itemId: string;
  itemType: ItemType;
}

interface SubscriptionResult {
  isSubscribed: boolean;
}

// API функции для работы с подписками
const subscriptionApi = {
  // Проверка статуса подписки
  checkSubscription: async (itemType: string, itemId: string): Promise<SubscriptionResult> => {
    const { data } = await axios.get<SubscriptionResult>(`/api/subscription/check/${itemType}/${itemId}`);
    console.log(`API: Checking subscription status for ${itemType} ${itemId}:`, data);
    return data;
  },
  
  // Переключение подписки (подписаться/отписаться)
  toggleSubscription: async (itemType: string, itemId: string): Promise<SubscriptionResult> => {
    console.log(`API: Toggling subscription for ${itemType} ${itemId}`);
    const { data } = await axios.post<SubscriptionResult>('/api/subscription', { itemId, itemType });
    console.log(`API: Toggle result:`, data);
    return data;
  }
};

// Хук для проверки статуса подписки
export const useSubscriptionStatus = ({ itemId, itemType }: SubscriptionParams) => {
  return useQuery<SubscriptionResult>({
    queryKey: ['subscription', itemType, itemId],
    queryFn: () => subscriptionApi.checkSubscription(itemType, itemId),
    refetchOnWindowFocus: false
  });
};

// Хук для подписки/отписки
export const useSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation<SubscriptionResult, Error, SubscriptionParams>({
    mutationFn: ({ itemId, itemType }) => subscriptionApi.toggleSubscription(itemType, itemId),
    
    // Оптимистичное обновление UI
    onMutate: async ({ itemId, itemType }) => {
      // Отменяем текущие запросы для этого ключа
      await queryClient.cancelQueries({ queryKey: ['subscription', itemType, itemId] });
      
      // Сохраняем предыдущее состояние
      const previousData = queryClient.getQueryData<SubscriptionResult>(['subscription', itemType, itemId]);
      
      if (previousData) {
        // Инвертируем статус подписки
        const newStatus = !previousData.isSubscribed;
        console.log(`Optimistic update: Setting ${itemType} ${itemId} subscription to ${newStatus}`);
        
        // Обновляем кэш оптимистично
        queryClient.setQueryData<SubscriptionResult>(['subscription', itemType, itemId], {
          isSubscribed: newStatus
        });
      }
      
      return { previousData };
    },
    
    // При успешном выполнении запроса
    onSuccess: (data, { itemId, itemType }) => {
      console.log(`Mutation successful for ${itemType} ${itemId}:`, data);
      
      // Обновляем кэш с актуальными данными от сервера
      queryClient.setQueryData(['subscription', itemType, itemId], data);
      
      // Также можно обновить список всех подписок
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
    
    // При ошибке возвращаем предыдущее состояние
    onError: (error, { itemId, itemType }, context: unknown) => {
      console.error(`Error toggling subscription for ${itemType} ${itemId}:`, error);
      
      // Проверяем и приводим контекст к правильному типу
      const typedContext = context as { previousData?: SubscriptionResult };
      if (typedContext && typedContext.previousData) {
        queryClient.setQueryData(['subscription', itemType, itemId], typedContext.previousData);
      }
    },
    
    // В любом случае (успех или ошибка) обновляем данные с сервера
    onSettled: (_, __, { itemId, itemType }) => {
      queryClient.invalidateQueries({ queryKey: ['subscription', itemType, itemId] });
    }
  });
};
