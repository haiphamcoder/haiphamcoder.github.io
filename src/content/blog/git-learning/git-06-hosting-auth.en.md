---
title: "Chapter 6: Hosting & Authentication"
date: 2025-09-16
tags: ["git", "tutorial", "version-control"]
lang: "en"
series: "Learning Git"
seriesOrder: 6
excerpt: "Lesson 6 in the Learning Git series: Chapter 6: Hosting & Authentication"
---

|                                                                                                                                                                                                                                                         |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| In the previous chapter, you learned about merging and how this Git feature allows integrating changes from one branch to another.                                                                                                                      |
| Until now, you have only worked with **local repositories** located directly on your computer.                                                                                                                                                        |
| This chapter marks the beginning of Part 2, where we will work with **hosting services** and **remote repositories**. The goal of this chapter is to help you choose a hosting service and set up authentication to connect securely to a remote repository via HTTPS or SSH. |

## Hosting Services and Remote Repositories

In [Chapter 2](/en/blog/git-02-local-repositories), I mentioned two types of repositories:

- **Local Repository**: Located on your personal computer.
- **Remote Repository**: Stored on a "cloud" hosting service.

A **Hosting Service** is a platform that provides storage services for Git projects. The three most popular services today are:

1. **GitHub** (Most popular, owned by Microsoft).
2. **GitLab** (Strong in DevOps/CI/CD).
3. **Bitbucket** (Owned by Atlassian, integrates well with Jira).

To transfer data between Local and Remote repositories, you need to connect and authenticate your identity. From [Chapter 7](/en/blog/git-07-remote-repos) onwards, you will use commands like `git push`, `git clone`, `git fetch`, and `git pull` to upload and download data. To do that, you need to set up authentication now.

## Setting Up a Hosting Service Account

If you don't have an account yet, choose a service and register. In this series, we will use **GitHub** as the primary example because it is the most popular platform in the open-source community.

> **[ Follow Along 6-1 ]**
>
> 1. Visit [github.com](https://github.com).
> 2. Register for a free account (or log in if you already have one).

## Setting Up Authentication Credentials

When working with a Remote Repository, there are two ways to interact:

1. Perform actions directly on the hosting service's website.
2. Perform actions from the command line (terminal) on your computer and synchronize with the server.

Case 2 requires "Authentication" so the server knows who you are and whether you have permission to write data to that repository. There are two main protocols for connecting: **HTTPS** and **SSH**.

| Protocol | Advantages                                                                                                                                    | Disadvantages                                                                                                                                                     |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTTPS** | Simple to understand, works easily through firewalls.                                                                                       | Requires entering a password (or Personal Access Token) frequently if not using a Credential Helper. No longer supports regular login passwords (must use a Token). |
| **SSH**   | High security, no need to enter a password every time you push (if using an SSH key without a passphrase or with ssh-agent). Standard for Linux/Unix environments. | Requires a slightly more complex initial setup.                                                                                                                   |

**Advice for Linux users:** Use **SSH**. This is the "standard" (native) method for Unix/Linux environments, helping you manage security keys better and not having to worry about managing Personal Access Tokens that expire every 30-90 days like HTTPS.

### 1. Using HTTPS (Optional)

If you choose HTTPS, you **cannot** use your GitHub login password to push code. Instead, you must create a **Personal Access Token (PAT)**.

- On GitHub: Settings -> Developer settings -> Personal access tokens -> Tokens (classic) -> Generate new token.
- When Git asks for a password in the terminal, paste this Token string.

_(We will skip this part to focus on SSH)._

### 2. Using SSH (Recommended for Linux)

The SSH (Secure Shell) protocol uses a key pair:

- **Public Key:** You give this to GitHub (this key is public, no need to hide it).
- **Private Key:** You keep this on your computer (absolutely do not share it with anyone).

When connecting, GitHub will use the Public Key to encrypt a message and challenge your computer to decrypt it using the Private Key. If decrypted successfully, you are authenticated.

#### Guide to Setting Up SSH on Ubuntu/Linux

Follow these steps to create and add an SSH key to GitHub.

**Step 1: Check for existing SSH keys**

Open the terminal and run:

```bash
ls -al ~/.ssh
```

If you see files like `id_rsa.pub`, `id_ecdsa.pub`, or `id_ed25519.pub`, it means you already have a key. You can reuse it or create a new one. Today we will create the most modern type of key, **Ed25519**.

**Step 2: Create a new SSH key**

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

_(Replace `your_email@example.com` with the email you used to register for GitHub)_

When asked:

1. `Enter file in which to save the key`: Press **Enter** to choose the default.
2. `Enter passphrase`:
   - Enter a password to protect the key (you'll have to enter this pass whenever you use the key).
   - Or press **Enter** to leave it blank (not recommended for security, but more convenient).

**Step 3: Add the key to the SSH Agent**

The SSH Agent is a background program that helps manage keys and remembers passphrases for you.

1. Start the agent:

```bash
eval "$(ssh-agent -s)"
# Output: Agent pid 1234
```

1. Add the Private Key to the agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

**Step 4: Copy the Public Key**

Use the `cat` command to display the content of the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

The result will be a string starting with `ssh-ed25519 ...`. Copy the entire string.

**Step 5: Add the key to GitHub**

1. Visit [GitHub SSH Keys Settings](https://github.com/settings/keys).
2. Click the **New SSH key** button.
3. **Title**: Give it a descriptive name (e.g., `My Ubuntu Laptop`).
4. **Key type**: Leave as default (Authentication Key).
5. **Key**: Paste the public key string you just copied here.
6. Click **Add SSH key**.

**Step 6: Test the connection**

Go back to the terminal and run the test command:

```bash
ssh -T git@github.com
```

- You might see a warning: `The authenticity of host 'github.com ...' can't be established... Are you sure you want to continue connecting (yes/no/[fingerprint])?` -> Type **yes** and Enter.
- If successful, you will see:
  > Hi username! You've successfully authenticated, but GitHub does not provide shell access.

## Summary

In this chapter, you performed two important preparation steps:

1. Chose and created an account on a hosting service (GitHub).
2. Set up secure authentication using SSH (or HTTPS).

Now you have the "passport" to connect your computer to the world of open source. In [Chapter 7](/en/blog/git-07-remote-repos), we will start creating our first Remote Repository and push the `rainbow` project code to it.
