import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class News {


    public static void main(String args[]) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\BiNi\\IdeaProjects\\Cel\\chromedriver.exe");


        WebDriver driver = new ChromeDriver();

        driver.get("file:///D:/School%20Stuff/3_2/SE%20II/Lab/News%20Scrapper/index.html");

//        System.out.println("Page Title: " + driver.getTitle());
//        System.out.println("Current URL: " + driver.getCurrentUrl());
//        System.out.println("Length of page Source: " + driver.getPageSource().toString().length());


        Scrapper scr = new Scrapper();

        String[] titles = scr.getTitle();
        String[] details = scr.getDetail();

        for (int i = 0; i < titles.length; i++) {
            driver.findElement(By.id("add-button")).click();
            driver.findElement(By.id("titleInput")).sendKeys(titles[i]);
            driver.findElement(By.id("detailInput")).sendKeys(details[i]);
            driver.findElement(By.id("postButton")).click();

        }


    }
}