package com.example.adminservice.dto.item;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @AttributeOverrides({
            @AttributeOverride( name = "dealId", column = @Column(name = "deal_id")),
            @AttributeOverride( name = "item", column = @Column(name = "item_id"))
    })
    private ItemId id;
    private Integer type;
}
