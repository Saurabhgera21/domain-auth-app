
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function DashboardScreen() {
  const [email, setEmail] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userEmail = user?.email?.trim().toLowerCase();

      const isAllowed =
        !!user &&
        user.emailVerified &&
        !!userEmail &&
        userEmail.split("@").length === 2 &&
        userEmail.endsWith("@hbplus.fit");

      if (!isAllowed) {
        setEmail("");
        setCheckingAuth(false);
        router.replace("/");
        return;
      }

      setEmail(userEmail!);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  }

  if (checkingAuth || !email) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Checking your access...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>HB</Text>
        </View>

        <Text style={styles.eyebrow}>HB PLUS PORTAL</Text>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          You have successfully signed in with your official account.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>SIGNED-IN ACCOUNT</Text>
          <Text style={styles.email}>{email}</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Authorized account</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleLogout}
          disabled={loggingOut}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loggingOut && styles.buttonDisabled,
          ]}
        >
          {loggingOut ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Logout</Text>
          )}
        </Pressable>

        <Text style={styles.footer}>Secure access · Google Authentication</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Platform.OS === "web" ? ("100vh" as any) : undefined,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f1f5f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f1f5f9",
  },
  loadingText: {
    color: "#64748b",
    fontSize: 14,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    padding: 32,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignItems: "center",
    gap: 18,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 8px 28px rgba(15, 23, 42, 0.08)" } as any
      : {
          elevation: 4,
          shadowColor: "#0f172a",
          shadowOpacity: 0.08,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
        }),
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  eyebrow: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
  title: {
    color: "#0f172a",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },
  infoBox: {
    width: "100%",
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    gap: 10,
  },
  label: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  email: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "600",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16a34a",
  },
  statusText: {
    color: "#15803d",
    fontSize: 13,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    minHeight: 50,
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
  },
});
