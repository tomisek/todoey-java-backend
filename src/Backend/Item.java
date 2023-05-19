package Backend;

public class Item {
    private int id;
    private String text;
    private Boolean finished;


    public Item () {

    }

    public Item(String text, Boolean finished) {
        this.text = text;
        this.finished = finished;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", finished=" + finished +
                '}';
    }
}

