import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;



public class Scrapper {

    private String chunck;


    public Scrapper(){
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\BiNi\\IdeaProjects\\Cel\\chromedriver.exe");


        WebDriver driver = new ChromeDriver();

        driver.get("https://addisfortune.net");
        chunck= driver.findElement(By.cssSelector("#addisfortune-main .row .span6")).getText();
    }







    public  String[] getTitle(){



        String news = chunck.split("›")[1];

        String newsArray[] = news.split("\n");

        String titles[] = new String[27];



        int counter= 0;

        for (int i = 1; i < newsArray.length -1; i+=3) {

                titles[counter] = newsArray[i];
                counter++;
        }



        return titles;
    }


    public String[] getDetail(){



        String news = chunck.split("›")[1];

        String newsArray[] = news.split("\n");

        String details[] = new String[27];



        int counter= 0;

        for (int i = 3; i < newsArray.length -1; i+=3) {

            details[counter] = newsArray[i];
            counter++;
        }



        return details;
    }
}