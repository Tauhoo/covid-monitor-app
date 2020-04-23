import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native"
import Notification from "./components/Notification"
import Status from "./components/Status"
import Stat from "./components/Stat"
import { queryNotification } from "./api"

export default function App() {
  const [notification, updateNotification] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotification() {
      const res = await queryNotification()
      updateNotification(res.data.Data)
      setLoading(false)
    }
    fetchNotification()
  }, [loading])

  return (
    <>
      <View style={styles.navbar}>
        <Text style={{ color: "white", fontSize: 20 }}>โควิด มอนิเตอร์</Text>
        <TouchableOpacity onPress={() => setLoading(true)}>
          <Text style={{ color: "white", fontSize: 15 }}>รีเฟรช</Text>
        </TouchableOpacity>
      </View>
      {loading ? null : (
        <ScrollView>
          <View style={styles.container}>
            {notification.map((props, index) => (
              <Notification key={index + ""} {...props} />
            ))}
            <Status></Status>
            <Stat></Stat>
          </View>
          <View style={styles.footer}>
            <Text style={styles.credit}>
              ข้อมูลจาก https:covid19.th-stat.com
            </Text>
            <Text style={styles.credit}>
              เซิร์ฟเวอร์โดย https:smilehost.asia
            </Text>
            <Text style={styles.credit}>พัตนาข้อมูลโดย www.kidkarnmai.com</Text>
            <Text style={styles.credit}>
              พัตนาแอพพลิเคชั่นโดย วชิรวิทย์ เวชรักษ์
            </Text>
          </View>
        </ScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 10,
  },
  navbar: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    backgroundColor: "#6c5ce7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    backgroundColor: "#2d3436",
    padding: 20,
  },
  credit: {
    color: "white",
    marginVertical: 5,
  },
})
