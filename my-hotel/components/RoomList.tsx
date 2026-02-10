'use client';

import { UsersRound, Maximize, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import styles from './page.module.css';

interface Room {
  id: number;
  name: string;
  capacity?: string;
  size?: string;
  price: number;
  description?: string;
  images?: string[];
  equipment?: string[];
}

export default function RoomList({ rooms, loading, checkAvailability, setSelectedRoom }: { rooms: Room[]; loading: boolean; checkAvailability: (roomId: number, roomName: string, roomPrice: number) => void; setSelectedRoom: (room: { id: number; name: string; price: number }) => void }) {
  return (
    <>
      {[...rooms]
        .sort((a, b) => a.id - b.id)
        .map(room => (
          <RoomItem 
            key={room.id} 
            room={room} 
            loading={loading} 
            checkAvailability={checkAvailability} 
            setSelectedRoom={setSelectedRoom}
          />
        ))}
    </>
  );
}

// Komponenti individual për çdo dhomë për të menaxhuar "Details"
function RoomItem({ room, loading, checkAvailability, setSelectedRoom }: { room: Room; loading: boolean; checkAvailability: (roomId: number, roomName: string, roomPrice: number) => void; setSelectedRoom: (room: { id: number; name: string; price: number }) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.roomBox}>
      {/* 1. IMAGE COLUMN */}
      <div className={styles.imageColumn}>
        {room.images && room.images.length > 0 && (
          <img
            src={room.images[0]}
            alt={room.name}
            className={styles.roomImagee}
          />
        )}
      </div>

      {/* 2. INFO COLUMN */}
      <div className={styles.roomInfo}>
        <h3 className={styles.roomTitle}>{room.name}</h3>
        
        <div className={styles.roomMeta}>
          {room.capacity && (
            <p>
              <strong>
                <UsersRound /> Occupancy:
              </strong>{' '}
              {room.capacity}
            </p>
          )}
          {room.size && (
            <p>
              <strong><Maximize /> Area:</strong> {room.size}
            </p>
          )}
        </div>

        {room.description && (
          <p className={styles.roomDescription}>{room.description}</p>
        )}
        
        {/* Butoni Details */}
        {room.equipment && room.equipment.length > 0 && (
          <div className={styles.detailsContainer}>
            <button
            type="button"
              className={styles.detailsButton}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              Details {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}
      </div>

      {/* 3. ACTION COLUMN */}
      <div className={styles.actionColumn}>
        <button
          onClick={() => checkAvailability(room.id, room.name, room.price)}
          disabled={loading}
          className={styles.checkAvailabilityBtn}
          type="button"
        >
          {loading ? 'Checking...' : 'Check availability'}
        </button>
      </div>

      {/* 4. EQUIPMENT SECTION (Gjerësi e plotë poshtë) */}
      {open && room.equipment && (
        <div className={styles.fullWidthEquipment}>
          <h4 className={styles.equipmentTitle}>Equipment</h4>
          <div className={styles.equipmentGrid}>
            {room.equipment.map((item, index) => (
              <div key={index} className={styles.equipmentItem}>
                <span className={styles.checkIcon}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}