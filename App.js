import React, { useState, useEffect } from "react"
import NetInfo from "@react-native-community/netinfo"
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
  const [internetStatus, setInternetStatus] = useState(true)

  useEffect(() => {
    async function fetchNotification() {
      try {
        const res = await queryNotification()
        if (!Array.isArray(res.data)) return setLoading(false)

        updateNotification(res.data.Data)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchNotification()
  }, [loading])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      setInternetStatus(state.isConnected)
    )
    return unsubscribe
  }, [])

  const content = loading ? null : (
    <ScrollView>
      <View style={styles.container}>
        {notification.map((props, index) => (
          <Notification key={index + ""} {...props} />
        ))}
        <Status></Status>
        <Stat></Stat>
      </View>
      <View style={styles.footer}>
        <Text style={styles.credit}>ข้อมูลจาก https:covid19.th-stat.com</Text>
        <Text style={styles.credit}>เซิร์ฟเวอร์โดย https:smilehost.asia</Text>
        <Text style={styles.credit}>พัตนาข้อมูลโดย www.kidkarnmai.com</Text>
        <Text style={styles.credit}>
          พัตนาแอพพลิเคชั่นโดย วชิรวิทย์ เวชรักษ์
        </Text>
      </View>
    </ScrollView>
  )

  return (
    <View style={styles.background}>
      <View style={styles.navbar}>
        <Text style={{ color: "white", fontSize: 20 }}>โควิด มอนิเตอร์</Text>
        <TouchableOpacity onPress={() => setLoading(true)}>
          <Text style={{ color: "white", fontSize: 15 }}>
            {internetStatus ? "รีเฟรช" : ""}
          </Text>
        </TouchableOpacity>
      </View>
      {internetStatus ? (
        content
      ) : (
        <View style={styles.container}>
          <View style={styles.warning}>
            <Text style={{ color: "white", fontSize: 20 }}>
              โปรดเชื่อมต่ออินเตอร์เน็ต
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#dfe4ea",
    height: "100%",
  },
  container: {
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 10,
  },
  navbar: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    marginBottom: 5,
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
  warning: {
    backgroundColor: "#d63031",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
})
