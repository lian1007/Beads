import os
import requests

base_url = "https://kiiikiii.kr/assets/shop/14_FriendshipBracelet/Content/Beads/B{}.png"
save_folder = "beads"

os.makedirs(save_folder, exist_ok=True)

for i in range(1, 51):  # 假設有50張
    url = base_url.format(i)
    r = requests.get(url)
    if r.status_code == 200:
        with open(f"{save_folder}/B{i}.png", "wb") as f:
            f.write(r.content)
        print(f"Downloaded B{i}.png")
    else:
        print(f"Not found: {url}")