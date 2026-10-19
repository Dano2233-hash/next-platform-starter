import asyncio
from playwright.async_api import async_playwright

async def run_test():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("1. Visiting Homepage...")
        await page.goto("http://localhost:3000")
        await page.wait_for_selector("text=DANO")
        title = await page.title()
        print(f"   Page Title: {title}")

        print("2. Searching for PUBG Mobile UC...")
        await page.fill("input[placeholder*='Search']", "PUBG")
        await page.keyboard.press("Enter")
        await page.wait_for_selector("text=PUBG Mobile UC Top-Up")

        print("3. Opening Product Details...")
        await page.click("text=PUBG Mobile UC Top-Up")
        await page.wait_for_selector("text=Select Package Option")

        print("4. Selecting 660 UC Package...")
        await page.click("text=660 UC")

        print("5. Clicking Buy Now...")
        await page.click("text=Instant Buy Now")
        await page.wait_for_selector("text=Customer Delivery Information")

        print("6. Filling Checkout Form...")
        await page.fill("input[placeholder='e.g. Lawa Kurdish']", "Jules Tester")
        await page.fill("input[placeholder='0750 xxx xxxx']", "07501234567")
        await page.select_option("select", "Erbil")
        await page.click("text=FastPay")

        print("7. Submitting Order...")
        await page.click("button:has-text('Create Order')")
        await page.wait_for_selector("text=ORDER CREATED SUCCESSFULLY")

        order_text = await page.inner_text("body")
        assert "Thank You, Jules Tester!" in order_text
        print("   Order created successfully!")

        print("8. Testing Admin Login...")
        await page.goto("http://localhost:3000/admin-login")
        await page.fill("input[placeholder='dano.js']", "dano.js")
        await page.fill("input[placeholder='••••••••']", "lawa2233")
        await page.click("button:has-text('Authenticate Admin')")
        await page.wait_for_selector("text=DANO STORE MANAGEMENT")
        print("   Admin authenticated successfully!")

        await page.screenshot(path="verification_screenshot.png")
        print("9. Screenshot saved to verification_screenshot.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_test())
