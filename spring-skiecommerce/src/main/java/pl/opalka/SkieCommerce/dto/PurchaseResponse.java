package pl.opalka.SkieCommerce.dto;


public class PurchaseResponse {
    private String orderTrackingNumber;

    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }
}
