

#   NOXER - Nox Emulator Power Tool <img src="https://sergoot.ru/wp-content/uploads/2021/10/Nox-App-Player-nastrojki.png" alt="Nox Logo" width="40"/>

Automate your Android penetration testing lab setup using Nox Emulator. Noxer is a powerful Python script designed for automating Android penetration testing tasks within the Nox Player emulator. It simplifies setup, enhances stability, manages Frida Server, removes unwanted bloatware, integrates BurpSuite certificates, and much more!

## 👋 Connect with me

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/AggressiveUser/)](https://www.linkedin.com/in/AggressiveUser/) [![Hack The Box](https://img.shields.io/badge/-Hack%20The%20Box-green?style=flat-square&logo=hack-the-box&logoColor=white&link=https://app.hackthebox.com/profile/17569)](https://app.hackthebox.com/profile/17569) [![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=github&link=https://github.com/AggressiveUser)](https://github.com/AggressiveUser) [![Twitter](https://img.shields.io/badge/-Twitter-blue?style=flat-square&logo=twitter&logoColor=white&link=https://twitter.com/AggressiveUserX)](https://twitter.com/AggressiveUserX) [![Telegram](https://img.shields.io/badge/-Telegram-blue?style=flat-square&logo=telegram&logoColor=white&link=https://t.me/AggressiveUser)](https://t.me/AggressiveUser) [![Email](https://img.shields.io/badge/-Email-red?style=flat-square&logo=Microsoft&logoColor=white&link=mailto:AggressiveUser@OutLook.com)](mailto:AggressiveUser@OutLook.com)

## 🚀 Features
- **Effortless Automation ⚙️:**
  - Automate the setup and configuration of your Android penetration testing lab with ease.
- **Stable ADB Connections 📱:**
  - Enhances ADB stability, preventing frequent disconnections and ensuring a more seamless testing experience.
- **Manage Frida Server ⚡:**
  Quickly install and launch Frida Server on the Nox Emulator, simplifying dynamic app analysis setup.
  - Install Frida Server
  - Run Frida Server
- **Ad and Bloatware Removal 🚯:**
  - Automate the removal of ads and unwanted pre-installed applications from the Nox Emulator, ensuring a clean environment for testing.
- **Interactive Command-Line Interface 💬:**
  - Enjoy an intuitive and user-friendly interface for managing your Android penetration testing lab.
- **BurpSuite Certificate Integration🔐:**
  - Seamlessly install and configure BurpSuite certificates for secure communication during penetration testing.
- **Windows Tools Management 💻:**
 Easily install or verify the status of essential pentesting tools (Frida, Objection, reFlutter) on your Windows machine.
  - Frida
  - Objection
  - reFlutter
- **Frida-Tool Options 🛠️:**
   Choose from various Frida-based options, including handling SSL pinning, root check bypass, custom script injection, and more.
  -  List installed applications
  - SSL Pinning Bypass
  - Root Check Bypass
  - SSL Pinning and Root Check Bypass

- **Flexible Options 🛠️:**
  - Select from a range of functionalities, including running Frida Server, opening an ADB shell, and more, within an interactive menu system.
- **Happy Android Pentesting 🕵️‍♂️:**
  - Explore, test, and analyze Android applications with confidence using this all-in-one automation script.

## ⚙️ Pre-requisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.x** 🐍
-  **Nox Player**  <img src=https://upload.wikimedia.org/wikipedia/commons/b/bc/Nox_App_Player_Icon3.png width=18>


## 📦 Installation
Before running NOXER, ensure you have the required dependencies installed. Follow these steps:

1. Clone this repository to your local machine.
    ```
    git clone https://github.com/AggressiveUser/noxer.git
    ```

2. Navigate to the project directory.
    ```
    cd noxer
    ```

3. Install the dependencies from the requirements.txt file using pip.
    ```
    pip install -r requirements.txt
    ```

4. You are now set to run the NOXER script.
    ```
    python noxer.py
    ```

Happy Android pentesting with Nox Emulator! 📱🔒🐍

    
## 📝 Usage

 **Step: 1**  Open **Nox Asst** and choose android version of your choice.
<img src="https://i.ibb.co/xDpNZLj/STEP-1.png" alt="STEP-1" border="0"/>

**Step: 2** Click on Settings ⚙️

<img src="https://i.ibb.co/W3zdv96/STEP-2.png" alt="STEP-2" border="0" />

**Step: 3** Navigate to **General** tab and check **Root**
<img src="https://i.ibb.co/pLhx6z4/STEP-3.png" alt="STEP-3" border="0" />

**Step: 4** Save Setting and Run the emulator.
<img src="https://i.ibb.co/Ln3VvqP/STEP-4.png" alt="STEP-4" border="0" />

If you face error **No VT Service Detected**. Click here to [Fix Virtualization / VT Service](https://aggressiveuser.github.io/OnlineTools/FixVirtualization/)
<img src="https://i.ibb.co/vkHW4bj/image.png" width=300 alt="image" border="0" />

**Step: 5** Run **NOXER** script which will automatically sync with running **NOX emulator**.
<img src="https://i.ibb.co/sRPFS80/STEP-5.png" alt="STEP-5" border="0" />

**After running the script, you'll be presented with a menu to choose from various options  🫠**

## 🤝 Contributing

Contributions are welcome! If you'd like to enhance the functionality of this tool, please submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE]() file for details.
