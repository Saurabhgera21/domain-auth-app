
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { loginWithGoogle } from "../auth";

const ACCESS_ERROR =
  "Access restricted. Please login using your official domain email.";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await loginWithGoogle();
      router.replace("/dashboard");
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Login failed. Please try again.";

      if (message.includes("Access restricted")) {
        setError(ACCESS_ERROR);
      } else if (
        message.includes("auth/popup-closed-by-user") ||
        message.includes("auth/cancelled-popup-request")
      ) {
        setError("Sign-in was cancelled. Please try again.");
      } else {
        setError("Unable to sign in. Please check your account and try again.");
        console.error("Google sign-in failed:", e);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>HB</Text>
        </View>

        <Text style={styles.title}>Welcome to HB Portal</Text>
        <Text style={styles.subtitle}>
          Sign in with your official HB Plus account to continue.
        </Text>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Authorized accounts only · @hbplus.fit
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Continue with Google</Text>
          )}
        </Pressable>

        {!!error && (
          <View accessibilityRole="alert" style={styles.errorBox}>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          Secure sign-in powered by Google and Firebase
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Platform.OS === "web" ? "100vh" as any : undefined,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f1f5f9",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    padding: 32,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    gap: 20,
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
  logo: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#64748b",
    textAlign: "center",
  },
  notice: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#eff6ff",
  },
  noticeText: {
    color: "#1d4ed8",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2563eb",
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 15,
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
  errorBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
  },
});
