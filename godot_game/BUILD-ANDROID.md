# Android build from GitHub Actions

1. Open the repository on GitHub.
2. Select **Actions** → **Build Android APK**.
3. Press **Run workflow** (or wait for a push build).
4. When the workflow completes, open its run and download the **ChernarusTales-Android** artifact.
5. Extract the artifact and install the APK on your Android phone (allow installation from your file manager if Android asks).

This is a test/debug APK, not a Play Store release. A Play Store release later needs a release signing key and an AAB export. Keep the signing key private; do not commit it to the repository.
