import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const ScheduleScreen = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  const schedule = {
    0: [ // Понедельник
      { time: '08:30', subject: 'Высшая математика', room: '301', professor: 'проф. Иванов' },
      { time: '10:15', subject: 'Физика', room: '205', professor: 'доц. Петров' },
      { time: '12:00', subject: 'Программирование', room: '401', professor: 'ассист. Сидоров' },
    ],
    1: [ // Вторник
      { time: '09:00', subject: 'История', room: '102', professor: 'доц. Смирнов' },
      { time: '10:45', subject: 'Литература', room: '203', professor: 'проф. Волков' },
    ],
    2: [ // Среда
      { time: '08:30', subject: 'Высшая математика', room: '301', professor: 'проф. Иванов' },
      { time: '11:00', subject: 'Химия', room: '305', professor: 'ассист. Новиков' },
    ],
    3: [], // Четверг
    4: [], // Пятница
    5: [], // Суббота
  };

  const renderScheduleItem = ({ item }) => (
    <TouchableOpacity style={styles.scheduleItem}>
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.details}>📍 Ауд. {item.room}</Text>
        <Text style={styles.professor}>👨‍🏫 {item.professor}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Выбор дня */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dayButton, selectedDay === index && styles.dayButtonActive]}
            onPress={() => setSelectedDay(index)}
          >
            <Text style={[styles.dayText, selectedDay === index && styles.dayTextActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Список пар */}
      <FlatList
        data={schedule[selectedDay]}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Нет пар в этот день 📭</Text>}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 10,
  },
  daySelector: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
  },
  dayButtonActive: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  dayTextActive: {
    color: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  scheduleItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 15,
    minWidth: 50,
  },
  itemContent: {
    flex: 1,
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  details: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  professor: {
    fontSize: 13,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
  },
});

export default ScheduleScreen;
