package pl.opalka.SkieCommerce.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PurchaseResponse {
    private final String orderTrackingNumber;

}
