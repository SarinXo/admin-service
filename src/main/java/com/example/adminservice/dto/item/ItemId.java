package com.example.adminservice.dto.item;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class ItemId implements Serializable {
    private Integer dealId;
    private Integer itemId;
}
