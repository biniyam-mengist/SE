import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import sun.awt.windows.WEmbeddedFrame;


public class Webdriver {

    public static void main(String args[]){
        System.setProperty("webdriver.chrome.driver","C:\\Users\\BiNi\\IdeaProjects\\Cel\\chromedriver.exe");


        WebDriver driver = new ChromeDriver();

        driver.get("http://portal.aait.edu.et/");

        System.out.println("Page Title: " + driver.getTitle());
        System.out.println("Current URL: " + driver.getCurrentUrl());
        System.out.println("Length of page Source: " + driver.getPageSource().toString().length());

//
        try {
            Thread.sleep(1000);
        } catch (Exception e){

        }
          driver.navigate().refresh();
        driver.findElement(By.name("UserName")).sendKeys("ATR/9443/08");
        driver.findElement(By.name("Password")).sendKeys("5420");
        driver.findElement(By.tagName("form")).submit();

        while(!driver.findElement(By.id("ml2")).isDisplayed()){

        }
        driver.findElement(By.id("ml2")).click();

        System.out.println(driver.findElement(By.tagName("table")).getText());

    }
}
