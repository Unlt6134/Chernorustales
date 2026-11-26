import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const entries = [
  { title: "Запись № 01", date: "17 октября", text: "Если ты читаешь это, значит, ноутбук всё-таки пережил зиму. Не включай радио после полуночи. Иногда оно отвечает." },
  { title: "Запись № 02", date: "21 октября", text: "За старой остановкой, где дорога уходит к лесу, есть знак. Под ним я оставил то, что не смог забрать." },
  { title: "Запись № 03", date: "Без даты", text: "Я слышал своё имя в эфире. Но передатчик отключён уже три дня." }
];

export default function App() {
  const [opened, setOpened] = useState(null);
  const [radio, setRadio] = useState(false);
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.kicker}>ЧЕРНОРУССКИЕ ИСТОРИИ · ПРОТОТИП</Text>
        <Text style={styles.title}>Сигнал{ "\n" }из прошлого</Text>
        <Text style={styles.subtitle}>Чернорусь. Осень. Ты нашёл старый ноутбук в пустом доме.</Text>
        <View style={styles.panel}>
          <Text style={styles.label}>СИСТЕМНОЕ СООБЩЕНИЕ</Text>
          <Text style={styles.body}>Батарея: 12%{"\n"}Последний пользователь: неизвестен{"\n"}В папке «Личное» обнаружены записи.</Text>
        </View>
        <Text style={styles.section}>Найденные записи</Text>
        {entries.map((entry, index) => (
          <Pressable key={entry.title} style={styles.entry} onPress={() => setOpened(opened === index ? null : index)}>
            <View style={styles.entryHead}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.date}>{entry.date}</Text>
            </View>
            {opened === index && <Text style={styles.body}>{entry.text}</Text>}
            <Text style={styles.tap}>{opened === index ? "СВЕРНУТЬ" : "ОТКРЫТЬ ЗАПИСЬ  ↗"}</Text>
          </Pressable>
        ))}
        <Pressable style={[styles.radio, radio && styles.radioOn]} onPress={() => setRadio(!radio)}>
          <Text style={styles.label}>РАДИО · {radio ? "ПОИСК ЧАСТОТЫ…" : "ВЫКЛЮЧЕНО"}</Text>
          <Text style={styles.body}>{radio ? "…шшш… здесь кто-нибудь есть?.. …шшш…" : "Нажми, чтобы настроить старый приёмник."}</Text>
        </Pressable>
        <Text style={styles.footer}>Это первый игровой набросок. История, локации и звуковой эфир появятся дальше.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#101411" },
  container: { padding: 22, paddingTop: 32, paddingBottom: 48 },
  kicker: { color: "#89978a", fontSize: 11, letterSpacing: 2, marginBottom: 20 },
  title: { color: "#e5e5d7", fontSize: 42, fontWeight: "700", lineHeight: 46 },
  subtitle: { color: "#a9b0a7", fontSize: 15, lineHeight: 23, marginTop: 14, marginBottom: 26 },
  panel: { backgroundColor: "#1c241e", borderColor: "#354238", borderWidth: 1, padding: 16, marginBottom: 28 },
  label: { color: "#a1b18f", fontSize: 10, letterSpacing: 1.5, marginBottom: 10 },
  body: { color: "#d0d5ca", fontSize: 15, lineHeight: 24 },
  section: { color: "#e1e4d8", fontSize: 20, fontWeight: "600", marginBottom: 12 },
  entry: { borderBottomColor: "#303a32", borderBottomWidth: 1, paddingVertical: 16 },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  entryTitle: { color: "#e0e4d9", fontSize: 16, fontWeight: "600" },
  date: { color: "#7e8b7e", fontSize: 12 },
  tap: { color: "#8d9d88", fontSize: 10, letterSpacing: 1.2, marginTop: 12 },
  radio: { backgroundColor: "#20251f", borderWidth: 1, borderColor: "#424b3c", padding: 16, marginTop: 26 },
  radioOn: { borderColor: "#a1b18f" },
  footer: { color: "#657166", fontSize: 12, lineHeight: 19, marginTop: 28 }
});