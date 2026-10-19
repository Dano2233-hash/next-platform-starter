from playwright.sync_api import sync_playwright

def run_cuj(page):
    print("Navigating to Dano Store Home...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    print("Searching for PUBG UC...")
    page.fill("input[placeholder*='Search']", "PUBG")
    page.wait_for_timeout(500)
    page.keyboard.press("Enter")
    page.wait_for_timeout(1000)

    print("Selecting product...")
    page.get_by_text("PUBG Mobile UC Top-Up").click()
    page.wait_for_timeout(1000)

    print("Selecting 660 UC Package...")
    page.get_by_text("660 UC").click()
    page.wait_for_timeout(500)

    print("Clicking Buy Now...")
    page.click("button:has-text('Buy Now')")
    page.wait_for_timeout(1000)

    print("Filling checkout details...")
    page.get_by_placeholder("e.g. Lawa Kurdish").fill("Sarkawt Kurdistan")
    page.wait_for_timeout(500)
    page.get_by_placeholder("0750 xxx xxxx").fill("07501112233")
    page.wait_for_timeout(500)

    print("Submitting order...")
    page.click("button:has-text('Create Order')")
    page.wait_for_timeout(1500)

    page.screenshot(path="/home/jules/verification/screenshots/order_success.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
